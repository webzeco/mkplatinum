import _ from 'lodash';

 export function sortBy(items,path){
     if (path==='Sort')return items;
     else {
         if(path==='Price: Low to High')  
         return _.orderBy(items, ['price'],['asc']); 
         if(path==='Price: High to Low')
         return _.orderBy(items, ['price'],['desc']); 
         if(path==='New Arrivals')
         return _.orderBy(items, ['price'],['asc']); 
         if(path==='Bestselling')
         return _.orderBy(items, ['price'],['asc']); 
         if(path==='Featured')
         return _.orderBy(items, ['price'],['asc']);
     }
      
     }