import * as XLSX from 'xlsx';

export function excelDateToDate(excelDate: number): Date {
    if (typeof excelDate !== 'number') {
      throw new Error('La fecha de Excel debe ser un número');
    }
  
    const parsedDate = XLSX.SSF.parse_date_code(excelDate);
    return new Date(parsedDate.y, parsedDate.m - 1, parsedDate.d);
}