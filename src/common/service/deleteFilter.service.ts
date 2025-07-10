import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteFilterService {
  constructor(
  ) { }

  filterDeleted(query: any = {}) { 
    let deleted = {
      deleted_at: null
    }
    return { ...query, ...deleted }
  }
}
