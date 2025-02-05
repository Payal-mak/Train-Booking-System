import { searchTrains, searchStations, type Station } from './trainApi';
import type { Train, Route } from '../types';

interface Graph {
  [key: string]: {
    [key: string]: {
      distance: number;
      train: Train;
    };
  };
}

interface RoutingNode {
  station: string;
  distance: number;
  path: string[];
  trains: Train[];
}

export class TrainRoutingService {
  private graph: Graph = {};
  private stations: Map<string, Station> = new Map();

  private async buildGraph(fromStation: string, toStation: string, date: string): Promise<void> {
    try {
      // Get all stations within reasonable distance
      const nearbyStations = await this.getNearbyStations(fromStation);
      const destStation = await this.getStation(toStation);
      if (destStation) {
        nearbyStations.push(destStation);
      }

      // Build graph connections
      for (const station of nearbyStations) {
        if (!this.graph[station.code]) {
          this.graph[station.code] = {};
        }

        // Search trains from this station to all other stations
        for (const destStation of nearbyStations) {
          if (station.code !== destStation.code) {
            try {
              const trains = await searchTrains({
                fromStationCode: station.code,
                toStationCode: destStation.code,
                dateOfJourney: date
              });

              if (trains.data && trains.data.length > 0) {
                const bestTrain = trains.data[0];
                this.graph[station.code][destStation.code] = {
                  distance: this.calculateDistance(bestTrain),
                  train: this.transformTrainData(bestTrain, station, destStation)
                };
              }
            } catch (error) {
              console.error(`Error fetching trains between ${station.code} and ${destStation.code}`);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error building graph:', error);
    }
  }

  private async getNearbyStations(stationCode: string): Promise<Station[]> {
    try {
      const station = await this.getStation(stationCode);
      if (!station) return [];
      
      const nearbyStations = await searchStations(station.name.split(' ')[0]);
      return nearbyStations.slice(0, 5);
    } catch (error) {
      console.error('Error fetching nearby stations');
      return [];
    }
  }

  private async getStation(code: string): Promise<Station | null> {
    if (this.stations.has(code)) {
      return this.stations.get(code)!;
    }

    try {
      const stations = await searchStations(code);
      const station = stations.find(s => s.code === code) || stations[0];
      if (station) {
        this.stations.set(code, station);
        return station;
      }
      return null;
    } catch (error) {
      console.error('Error fetching station');
      return null;
    }
  }

  private calculateDistance(train: any): number {
    const duration = this.parseDuration(train.duration);
    const price = train.price || 100;
    return duration + (price / 100);
  }

  private parseDuration(duration: string): number {
    const hours = duration.match(/(\d+)h/);
    const minutes = duration.match(/(\d+)m/);
    return (hours ? parseInt(hours[1]) * 60 : 0) + (minutes ? parseInt(minutes[1]) : 0);
  }

  private transformTrainData(train: any, fromStation: Station, toStation: Station): Train {
    return {
      id: train.train_number,
      trainNumber: train.train_number,
      trainName: train.train_name,
      from: fromStation.name,
      to: toStation.name,
      departureTime: train.departure_time,
      arrivalTime: train.arrival_time,
      duration: train.duration,
      price: train.price || Math.floor(Math.random() * (150 - 50) + 50),
      availableSeats: Math.floor(Math.random() * 100)
    };
  }

  private dijkstra(start: string, end: string): Route | null {
    const distances: { [key: string]: number } = {};
    const previous: { [key: string]: string | null } = {};
    const trains: { [key: string]: Train } = {};
    const unvisited = new Set<string>();

    Object.keys(this.graph).forEach(station => {
      distances[station] = Infinity;
      previous[station] = null;
      unvisited.add(station);
    });
    distances[start] = 0;

    while (unvisited.size > 0) {
      let minDistance = Infinity;
      let current: string | null = null;
      
      unvisited.forEach(station => {
        if (distances[station] < minDistance) {
          minDistance = distances[station];
          current = station;
        }
      });

      if (!current || distances[current] === Infinity) break;
      if (current === end) break;

      unvisited.delete(current);

      Object.entries(this.graph[current] || {}).forEach(([neighbor, data]) => {
        if (unvisited.has(neighbor)) {
          const alt = distances[current] + data.distance;
          if (alt < distances[neighbor]) {
            distances[neighbor] = alt;
            previous[neighbor] = current;
            trains[neighbor] = data.train;
          }
        }
      });
    }

    if (!previous[end]) return null;

    const path: string[] = [];
    const routeTrains: Train[] = [];
    let current = end;

    while (current) {
      path.unshift(current);
      if (trains[current]) {
        routeTrains.unshift(trains[current]);
      }
      current = previous[current] || '';
    }

    return {
      trains: routeTrains,
      totalDuration: this.calculateTotalDuration(routeTrains),
      totalPrice: routeTrains.reduce((sum, train) => sum + train.price, 0),
      connectionTimes: this.calculateConnectionTimes(routeTrains)
    };
  }

  private calculateTotalDuration(trains: Train[]): number {
    return trains.reduce((total, train) => total + this.parseDuration(train.duration), 0);
  }

  private calculateConnectionTimes(trains: Train[]): number[] {
    const connectionTimes: number[] = [];
    for (let i = 0; i < trains.length - 1; i++) {
      const currentTrain = trains[i];
      const nextTrain = trains[i + 1];
      const connection = this.calculateTimeDifference(
        currentTrain.arrivalTime,
        nextTrain.departureTime
      );
      connectionTimes.push(connection);
    }
    return connectionTimes;
  }

  private calculateTimeDifference(time1: string, time2: string): number {
    const [hours1, minutes1] = time1.split(':').map(Number);
    const [hours2, minutes2] = time2.split(':').map(Number);
    return ((hours2 * 60 + minutes2) - (hours1 * 60 + minutes1) + 1440) % 1440;
  }

  public async findRoutes(fromStation: string, toStation: string, date: string): Promise<Route[]> {
    try {
      // First, try to find direct trains
      const directTrains = await searchTrains({
        fromStationCode: fromStation,
        toStationCode: toStation,
        dateOfJourney: date
      });

      if (directTrains.data && directTrains.data.length > 0) {
        const from = await this.getStation(fromStation);
        const to = await this.getStation(toStation);
        if (from && to) {
          return [{
            trains: [this.transformTrainData(directTrains.data[0], from, to)],
            totalDuration: this.parseDuration(directTrains.data[0].duration),
            totalPrice: directTrains.data[0].price || 100,
            connectionTimes: []
          }];
        }
      }

      // If no direct trains, build graph and find alternative routes
      await this.buildGraph(fromStation, toStation, date);
      const route = this.dijkstra(fromStation, toStation);
      return route ? [route] : [];
    } catch (error) {
      console.error('Error finding routes:', error);
      return [];
    }
  }
}

export const trainRoutingService = new TrainRoutingService();