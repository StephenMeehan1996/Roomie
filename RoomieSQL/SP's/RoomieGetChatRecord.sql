CREATE OR REPLACE FUNCTION public.roomiegetchatrecord(
	id uuid)
    RETURNS TABLE(chatrecordid integer, chatid uuid, user1 uuid, user2 uuid, createddate date) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
    RETURN QUERY RoomieGetChatRecord
    SELECT 
		"ChatRecordID",
		"ChatID",
		"User1ID",
		"User2ID",
		"CreatedDate"
    FROM 
		public."ChatRecordTBL"
    WHERE 
		"User1ID" = id OR "User2ID" = id;
END;
$BODY$;

ALTER FUNCTION public.roomiegetchatrecord(uuid)
    OWNER TO postgres;
