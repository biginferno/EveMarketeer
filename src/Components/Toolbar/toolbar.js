import  React from 'react';
import './toolbar.css'

export default function Toolbar(props) {

    const options = {
        buy_station: "Jita",
        sell_station: "Amarr",
        freighter: "Providence"
    }

    const setBuyStation = (e) =>{
        console.log("Changed Buy")
        options.buy_station = e.target.value
    }
    const setSellStation = (e) =>{
        console.log("Changed Sell")
        options.sell_station = e.target.value
    }
    const setFreighter = (e) =>{
        // console.log("Changed Freighter")
        console.log("Changed Freighter", e.target.value)
        options.freighter = e.target.value
    }

    const onSubmit = (event) => {

        if(!options.buy_station || !options.sell_station || !options.freighter) {
            //Throw error, need all inputs
            console.log("Failed Test")
            console.log(options)
        }
        else {
            console.log(options)
            props.toolbarCallback(options);
            event.preventDefault();
        }

    }
    return (

        <div className='toolbar'>
            <h3>Buy Station</h3>
            <select className='buy-station dropdown' onChange={setBuyStation}>
                <option className='dropdown-content' value="Jita" >Jita</option>
                <option className='dropdown-content' value="Amarr">Amarr</option>
                <option className='dropdown-content' value="Dodixie">Dodixie</option>
                <option className='dropdown-content' value="Rens">Rens</option>
                <option className='dropdown-content' value="Hek">Hek</option>
            </select>
            <h3>Sell Station</h3>
            <select className='sell-station dropdown' onChange={setSellStation}>
                <option className='dropdown-content' value="Amarr">Amarr</option>
                <option className='dropdown-content' value="Jita" >Jita</option>
                <option className='dropdown-content' value="Dodixie">Dodixie</option>
                <option className='dropdown-content' value="Rens">Rens</option>
                <option className='dropdown-content' value="Hek">Hek</option>
            </select>
            <h3>Freighter</h3>
            <select className='freighter dropdown' onChange={setFreighter}>
                <option className='dropdown-content' value="Providence">Providence</option>
                <option className='dropdown-content' value="Charon">Charon</option>
                <option className='dropdown-content' value="Obelisk">Obelisk</option>
                <option className='dropdown-content' value="Fenrir">Fenrir</option>
            </select>
            <div className='dropdown submit' onClick={onSubmit}><button>Submit</button></div>
        </div>
    )
    

}
