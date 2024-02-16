CREATE OR REPLACE FUNCTION public.roomiegetpresavedmesssages(
	in_id uuid)
    RETURNS TABLE(usepresavedmessageid integer, postdate date, messagetitle character varying, messagebody character varying, userid integer, useridentifier uuid) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
    RETURN QUERY
    SELECT
        "UsePresavedMessageID",
		"Date",
		"MessageTitle",
		"MessageBody",
		"UserID",
		"UserIdentifier"
    FROM
        public."UserPresavedMessageTBL" U
	WHERE
		U."UserIdentifier" = in_id;
END;   
$BODY$;

ALTER FUNCTION public.roomiegetpresavedmesssages(uuid)
    OWNER TO postgres;
