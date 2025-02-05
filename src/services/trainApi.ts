import axios from 'axios';

const RAPID_API_KEY = 'd5e98ec0e4msh39d65207d97629fp1d97a7jsn3161280864cb';
const RAPID_API_HOST = 'irctc1.p.rapidapi.com';

export interface TrainSearchParams {
  fromStationCode: string;
  toStationCode: string;
  dateOfJourney: string;
}

export interface Station {
  code: string;
  name: string;
}

export interface LiveTrainStatus {
  trainNumber: string;
  trainName: string;
  currentStation: string;
  nextStation: string;
  expectedArrival: string;
  delay: string;
  lastUpdated: string;
  status: string;
}

export interface PNRStatus {
  trainNumber: string;
  trainName: string;
  boardingPoint: string;
  destination: string;
  reservationUpTo: string;
  class: string;
  chartStatus: string;
  passengers: {
    number: number;
    bookingStatus: string;
    currentStatus: string;
  }[];
  dateOfJourney: string;
  expectedArrival: string;
}

// Mock data for development
const mockStations: Station[] = [
  { code: 'NDLS', name: 'New Delhi' },
  { code: 'BCT', name: 'Mumbai Central' },
  { code: 'MAS', name: 'Chennai Central' },
  { code: 'HWH', name: 'Howrah Junction' },
  { code: 'SBC', name: 'Bengaluru City' },
];

const mockTrainData = {
  train_number: "12345",
  train_name: "Mock Express",
  departure_time: "10:00",
  arrival_time: "16:00",
  duration: "6h 0m",
  price: 100,
  available_seats: 50
};

export const searchTrains = async (params: TrainSearchParams) => {
  try {
    // For development, return mock data
    return {
      data: [mockTrainData, { ...mockTrainData, train_number: "12346" }]
    };

    // Production code:
    /*
    const response = await axios.get('https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations', {
      params,
      headers: {
        'x-rapidapi-key': RAPID_API_KEY,
        'x-rapidapi-host': RAPID_API_HOST,
      },
    });
    return response.data;
    */
  } catch (error) {
    console.error('Error fetching trains:', error);
    return { data: [] };
  }
};

export const searchStations = async (query: string): Promise<Station[]> => {
  try {
    // For development, return filtered mock data
    return mockStations.filter(station => 
      station.name.toLowerCase().includes(query.toLowerCase()) ||
      station.code.toLowerCase().includes(query.toLowerCase())
    );

    // Production code:
    /*
    const response = await axios.get('https://irctc1.p.rapidapi.com/api/v1/searchStation', {
      params: { query },
      headers: {
        'x-rapidapi-key': RAPID_API_KEY,
        'x-rapidapi-host': RAPID_API_HOST,
      },
    });
    return response.data.data.map((station: any) => ({
      code: station.code,
      name: station.name
    }));
    */
  } catch (error) {
    console.error('Error searching stations:', error);
    return [];
  }
};

export const getLiveTrainStatus = async (trainNo: string, startDay: number): Promise<LiveTrainStatus> => {
  try {
    // For development, return mock data
    return {
      trainNumber: trainNo,
      trainName: "Mock Express",
      currentStation: "New Delhi",
      nextStation: "Agra",
      expectedArrival: "14:30",
      delay: "10 mins",
      lastUpdated: new Date().toISOString(),
      status: "Running"
    };

    // Production code:
    /*
    const response = await axios.get('https://irctc1.p.rapidapi.com/api/v1/liveTrainStatus', {
      params: { trainNo, startDay },
      headers: {
        'x-rapidapi-key': RAPID_API_KEY,
        'x-rapidapi-host': RAPID_API_HOST,
      },
    });
    
    const data = response.data.data;
    return {
      trainNumber: data.train_number,
      trainName: data.train_name,
      currentStation: data.current_station_name,
      nextStation: data.next_station_name,
      expectedArrival: data.expected_arrival,
      delay: data.delay,
      lastUpdated: data.last_updated,
      status: data.current_status
    };
    */
  } catch (error) {
    console.error('Error fetching live train status:', error);
    throw new Error('Failed to fetch live train status');
  }
};

export const getPNRStatus = async (pnr: string): Promise<PNRStatus> => {
  try {
    // For development, return mock data
    return {
      trainNumber: "12345",
      trainName: "Mock Express",
      boardingPoint: "New Delhi",
      destination: "Mumbai Central",
      reservationUpTo: "Mumbai Central",
      class: "3A",
      chartStatus: "Prepared",
      dateOfJourney: "2024-03-20",
      expectedArrival: "16:00",
      passengers: [
        {
          number: 1,
          bookingStatus: "CNF",
          currentStatus: "CNF"
        }
      ]
    };

    // Production code:
    /*
    const response = await axios.get('https://irctc1.p.rapidapi.com/api/v3/getPNRStatus', {
      params: { pnr },
      headers: {
        'x-rapidapi-key': RAPID_API_KEY,
        'x-rapidapi-host': RAPID_API_HOST,
      },
    });
    
    const data = response.data.data;
    return {
      trainNumber: data.train_number,
      trainName: data.train_name,
      boardingPoint: data.boarding_point,
      destination: data.destination,
      reservationUpTo: data.reservation_upto,
      class: data.class,
      chartStatus: data.chart_prepared,
      dateOfJourney: data.doj,
      expectedArrival: data.expected_arrival,
      passengers: data.passengers.map((p: any) => ({
        number: p.no,
        bookingStatus: p.booking_status,
        currentStatus: p.current_status
      }))
    };
    */
  } catch (error) {
    console.error('Error fetching PNR status:', error);
    throw new Error('Failed to fetch PNR status');
  }
};