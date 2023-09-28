SET QUOTED_IDENTIFIER ON
GO
SET ANSI_NULLS ON
GO

/***************************************************************************************
Copyright c2023, Roomie
SP Name : 
        SampleSP
Author : 
        Sample Author
Date : 
        01 Jan 2023
Description :
        This SP saves some sample data to the table: SampleTable
History:
        01 Jan 2023 Sample Author 
            Initial Write
        02 Jan 2023 Second Author
            Description of modification
*****************************************************************************************/
CREATE OR ALTER PROCEDURE [dbo].[SampleSP]

/* 1*/ @Firstname VARCHAR(50),
/* 2*/ @Secondname VARCHAR(50),
/* 3*/ @Email VARCHAR(50)

AS BEGIN;
    SET NOCOUNT ON;

    DECLARE 
        @LocalError INT,
        @ErrorMessage VARCHAR(10);

    BEGIN TRY
        BEGIN TRANSACTION SampleSP
            INSERT 
                SampleTable WITH(UPDLOCK,ROWLOCK)
                    (
                        Firstname,
                        Secondname,
                        Email,
                        RequestDate
                    )

                VALUES
                    (
                        @Firstname,
                        @Secondname,
                        @Email,
                        GETDATE()
                    );

            SELECT
                Firstname,
                Secondname,
                Email,
                RequestDate
            FROM
                SampleTable;

        COMMIT TRANSACTION SampleSP;
    END TRY

    BEGIN CATCH
        SELECT 
            @LocalError = ERROR_NUMBER(),
            @ErrorMessage = ERROR_MESSAGE();

        IF(XACT_STATE()) <> 0
            BEGIN
            ROLLBACK TRANSACTION SampleSP;
        END

        RAISERROR('SampleSP: %d: %s', 17, 1, @LocalError, @ErrorMessage);
    END CATCH;

RETURN(0);
END;

GO
SET QUOTED_IDENTIFIER OFF
GO
SET ANSI_NULLS OFF
GO