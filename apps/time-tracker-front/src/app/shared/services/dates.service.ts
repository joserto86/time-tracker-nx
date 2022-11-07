import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatesService {

    getDaysRange(firstDay:Date, lastDay:Date):string[] {
        
        let result:string[] = [];
        
        if (firstDay < lastDay) {
            for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
                result.push(`${d.getFullYear()}-${d.getMonth() + 1 }-${d.getDate()}`);
            }
        }

        return result;
    }
}
