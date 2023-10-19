/* eslint-disable import/no-anonymous-default-export */
import { useState, useCallback } from "react";
import dayjs from "dayjs";

// Components
import Datenomal from "./datenomal";

export default ({
    limitMinDate = null,
    limitMaxDate = null,
    local        = "en",
    startDate    = null,
    endDate      = null,
    handleChange = () => {}
}) => {

    const checkDateFormat = (date) => {
        const dateToWhole = dayjs(date).format('YYYY/MM/DD');
        let reg = /^[1-9]\d{3}\/(0[1-9]|1[0-2]?)\/(0[1-9]|[1-2][0-9]?|3[0-1]?)$/;
        return reg.test(dateToWhole)? dayjs(date).format('YYYY/M/D'):dayjs().format('YYYY/M/D');
    }

    const [ stateStartDate, setStartDate ] = useState(checkDateFormat(startDate));
    const [ stateEndDate  , setEndDate   ] = useState(checkDateFormat(endDate));

    const handleCheck = useCallback(({ type=null, date=null }) => {
        if( type==="start" ){
            setStartDate(date);
        }else if(type==="end"){
            setEndDate(date);
        }
        
    }, []);

    return(
        <div className="date-range">
            <Datenomal 
                limitMinDate = {limitMinDate}
                limitMaxDate = {limitMaxDate}
                local        = {local}
                defaultValue = {stateStartDate}
                compareValue = {stateEndDate}
                compareType  = {'start'}
                handleChange = {(val) => {
                    handleCheck({ type: 'start', date: val });
                    handleChange({
                        startDate: val,
                        endDate  : stateEndDate
                    });
                }}
            />
            <span>-</span>
            <Datenomal 
                limitMinDate = {limitMinDate}
                limitMaxDate = {limitMaxDate}
                local        = {local}
                defaultValue = {stateEndDate}
                compareValue = {stateStartDate}
                compareType  = {'end'}
                handleChange = {(val) => {
                    handleCheck({ type: 'end', date: val });
                    handleChange({
                        startDate: stateStartDate,
                        endDate  : val
                    });
                }}
            />
        </div>
    );
}