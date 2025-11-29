export interface ContactInfo {
  phone: string;
  email: string;
  workingHours: {
    weekdays: string;
    weekends: string;
  };
}
