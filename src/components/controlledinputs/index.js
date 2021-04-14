export default function Controlledinputs(props) {
    function handleSports(event){
        // console.log(event.target);
        props.onChange(event);
    }

    function handleName(event){
        props.onSelect(event);
    }

    function handleSubmit(event){
        props.onClick(event);
    }

    return (
             <div style={ props.stylesheet.container }>
            <form>
                <label style={props.stylesheet.boldText}>Enter Name</label>
                <input style={{...props.stylesheet.input}} type="text" placeholder="Enter Name" name="name" onSelect={handleName}/>

                <label style={props.stylesheet.boldText}>Select Sport</label>
                <select onChange={handleSports}>
                    <option value="" selected>Select Any Sport</option>
                {
                props.sports.map((sport, index) => {
                  return <option value={sport.value}>{sport.label}</option>;
                })
                }
              </select>
              <br/>
              <br/>
              <br/>
              
              { props.isSports ? 
                <>
                    <label style={props.stylesheet.boldText}>What are you good at?</label><br/>
                </>
            :
            <label></label>
            }
              { props.isSports ?
                props.sportsOptions.map((option,i)=>{
                    return <label key={i}>
                                <input 
                                    type="radio" 
                                    name="sports_radio"
                                    key={option.value}
                                    onClick={handleSubmit} 
                                    value={option.label} />
                                {option.label}
                                <br/>
                            </label>
                })
                : 
                <></>
            }

            </form>
            </div>
    )
}