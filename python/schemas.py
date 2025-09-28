from pydantic import BaseModel
from datetime import datetime
class ReservCreate(BaseModel):
  name: str
  email: str
  reserv_date: datetime
  inquiry_detail: str
class ReservResponse(BaseModel):
  name: str
  email: str
  reserv_date: datetime
  inquiry_detail: str
  class Config:
    orm_mode = True