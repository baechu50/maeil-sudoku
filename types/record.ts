type RecordItem = {
  rank: number;
  name: string;
  timeInSeconds: number;
};

export interface RecordRequest {
  recordId: string;
}

export interface RecordResponse {
  top10: RecordItem[];
  myRecord: RecordItem;
}
