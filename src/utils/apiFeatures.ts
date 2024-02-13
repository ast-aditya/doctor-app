import { regexFields } from "./utilVars";
import { excludedFields } from "./utilVars";

export class APIFeatures {
    public query: any;
    public mongooseQuery: any;
    public queryString: any;
  
    constructor(mongooseQuery: any, queryString: any) {
      this.mongooseQuery = mongooseQuery;
      this.queryString = queryString;
    }
    filter(type?: 'aggregate' | 'find') {
        const queryObj = { ...this.queryString };
    
        excludedFields.forEach((el) => delete queryObj[el]);
    
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    
        const filter = JSON.parse(queryStr);
    
        for (const key in filter) {
          if (regexFields.includes(key)) {
            filter[key] = new RegExp(filter[key], 'i');
          }
        }
    
        if (type && type === 'aggregate') {
          this.query = this.query.match(filter);
        } else {
          this.query = this.query.find(filter);
        }
    
        return this;
      }
    sort() {
        if (this.queryString.sort) {
          const sortBy = this.queryString.sort.split(',').join(' ');
          this.query = this.query.sort(sortBy);
        } else {
          this.query = this.query.sort('-_id');
        }
    
        return this;
      }

      limitFields() {
        if (this.queryString.fields) {
          const fields = this.queryString.fields.split(',').join(' ');
          this.query = this.query.select(fields);
        } else {
          this.query = this.query.select('-__v');
        }
    
        return this;
      }
      
      paginate() {
        const page = this.queryString.page * 1||1;
        const limit = this.queryString.limit * 1||100;
    
        if (page && limit) {
          const skip = (page - 1) * limit * 1;
          this.query = this.query.skip(skip).limit(limit);
        }
    
        return this;
      }

    }