export const timeperiodsInventory = [
    { viewValue: 'All available data', value: 'max' },
    { viewValue: 'Five years', value: '5y' },
    { viewValue: 'Two years', value: '2y' },
    { viewValue: 'One year', value: '1y' },
    { viewValue: 'Year-to-date', value: 'ytd' },
    { viewValue: 'Six months', value: '6m' },
    { viewValue: 'Three months', value: '3m' },
    { viewValue: 'One month', value: '1m' }
  ];

export class StocksUtil {
  static getMinDateforCalendar(value: any): Date {
    let returnDate = null;
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const day = new Date().getDay();
    switch (value) {
        case 'max': {
            returnDate = null;
          break;
        }
        case '5y': {
          
            returnDate = new Date(currentYear - 5,currentMonth, day);
          break;
  
        }
        case '2y': {
            returnDate = new Date(currentYear - 2,currentMonth, day);
            break;
        }
        case '1y': {
            returnDate = new Date(currentYear - 1,currentMonth, day);
          break;
        } 
        case 'ytd': {
            returnDate = new Date(currentYear ,0, day);
          break;
        }
        case '6m': {
          
            returnDate.setMonth(new Date().getMonth() - 6);
          break;
        }
        case '3m': {
            returnDate.setMonth(new Date().getMonth() - 3);
          break;
        }
        case '1m': {
            returnDate.setMonth(new Date().getMonth() - 1);
          break;
        }
      }
      return returnDate;
  }


    
}