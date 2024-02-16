CREATE OR REPLACE FUNCTION public.roomieinsertpresavedmessage(
	in_date date,
	in_title character varying,
	in_body character varying,
	in_userid integer,
	in_useridentifier uuid)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
BEGIN
    INSERT INTO public."UserPresavedMessageTBL" ("Date", "MessageTitle", "MessageBody", "UserID","UserIdentifier")
    VALUES (In_Date, In_Title, In_Body, in_userID, in_userIdentifier);
END;
$BODY$;

ALTER FUNCTION public.roomieinsertpresavedmessage(date, character varying, character varying, integer, uuid)
    OWNER TO postgres;
