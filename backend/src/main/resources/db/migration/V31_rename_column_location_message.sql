ALTER TABLE tabtab.location_message
CHANGE LocationMessageID location_messageid int auto_increment NOT NULL

ALTER TABLE tabtab.location_message
ADD message_type varchar(100) DEFAULT('CLIENT');