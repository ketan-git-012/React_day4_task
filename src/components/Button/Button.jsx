import { Button } from '@material-ui/core';
import CustomSpinner from './../../components/Spinner/Spinner';

export default function Buttons(props){
    const { loader, styles, disabled } = props;

  
        if(loader){
            return (
                <Button style={styles} variant="contained" type="submit" disabled={disabled} color="primary">
                    Submit
                </Button>
            )
        }
        else{
            return (
                <Button style={styles} variant="contained" type="button" disabled={true} color="primary">
                    <CustomSpinner></CustomSpinner>
                </Button>
            )
        }
       
}