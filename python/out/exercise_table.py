# -*- encoding: utf-8 -*-
import datetime
import uuid
import sys
from sqlalchemy import (Column, String,Integer, Text, ForeignKey,CHAR, VARCHAR, INT, create_engine, MetaData, DECIMAL, DATETIME, exc, event, Index, and_)
from sqlalchemy.ext.declarative import declarative_base
sys.dont_write_bytecode = True
## SQLAlchemyのベースクラスを定義  
Base = declarative_base()
## Exercise_tableモデルクラスの定義
class Exercise_table(Base):
  __tablename__ = 'exercise_table'
  name = Column(VARCHAR(255))
  eventKey = Column(VARCHAR(255))
  eventLabel = Column(VARCHAR(255))
  exerciseTime = Column(VARCHAR(255))
  overveiew = Column(VARCHAR(255))
  youtubeID = Column(VARCHAR(255))
  videoUrl = Column(VARCHAR(255))
  def __init__(self):
    self.id = str(uuid.uuid4())
    now_data_time = str(datetime.datetime.now().strftime("%Y%m%d%H%M%S"))
    self.create_at =  now_data_time
    self.update_at =  now_data_time