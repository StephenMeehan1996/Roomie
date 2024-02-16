CREATE OR REPLACE FUNCTION public.roomieinsertadapplication(
	in_addid integer,
	in_useridentifier uuid,
	in_message text,
	in_date date)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
BEGIN
    INSERT INTO public."AdApplicationTBL" ("AdID","UserIdenifier","Message","Date")
    VALUES (in_AddID, in_UserIdentifier, in_Message, in_Date);
END;
$BODY$;

ALTER FUNCTION public.roomieinsertadapplication(integer, uuid, text, date)
    OWNER TO postgres;
