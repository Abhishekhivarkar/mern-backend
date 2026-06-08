export interface Notes {
  note_id: string;
  note_name: string;
  note_content: string;
  is_pinned: Boolean;
  is_deleated: Boolean;
  user_id: string;
  created_at: Date;
  updated_at: Date;
  price:number
  is_paid:boolean
  is_published:boolean
}
