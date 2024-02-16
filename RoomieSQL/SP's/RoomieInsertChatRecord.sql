CREATE OR REPLACE FUNCTION public.roomieinsertchatrecord(
	in_chatid uuid,
	in_user1 uuid,
	in_user2 uuid,
	in_createddate date)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
BEGIN
    INSERT INTO public."ChatRecordTBL" ("ChatID","User1ID","User2ID","CreatedDate")
    VALUES (in_ChatID, in_User1, in_User2, in_CreatedDate);
END;
$BODY$;

ALTER FUNCTION public.roomieinsertchatrecord(uuid, uuid, uuid, date)
    OWNER TO postgres;
