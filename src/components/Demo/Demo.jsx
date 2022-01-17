import './Demo.scss'

import React, {useState, useEffect} from 'react'

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

function Demo() {

    const db = ['Anaconda', 'Ant', 'Bat', 'Bear', 'Bee', 'Bird', 'Buffalo', 'Butterfly', 'Camel', 'Cat', 'Chicken', 'Cow', 'Dinosaur', 'Dog', 'Duck', 'Elephant', 'Falcon', 'Flamingo', 'Gorilla', 'Horse', 'Kangaroo', 'Lion', 'Monkey', 'Mosquito', 'Mouse', 'Octopus', 'Owl', 'Panda', 'Penguin', 'Rat', 'Sheep', 'Snake', 'Wolf', 'Zebra'];

    const [animals, setAnimals] = useState([]);
    const [listedAnimals, setListedAnimals] = useState([]);
    const [check, setCheck] = useState([]);
    const [current, setCurrent] = useState('');
    const [showing, setShowing] = useState(-1);
    const [submitted, setSubmitted] = useState(false);

    useEffect(()=>{
        var temp = [];
        while(temp.length < 10) {
            var a = db[getRandomInt(db.length)];
            if (!temp.includes(a)) temp.push(a);
        }
        setAnimals(temp);
    }, []);

    useEffect(()=>{
        console.log(animals);
        // setShowing(0);
    }, [animals]);

    const startFunciton = () => {
        setShowing(0);
      }

    useEffect(async ()=>{
        console.log('showing: ', showing);
        if(showing===-1){return;}
        await timeout(1000);
        if(showing < 10) setShowing(showing+1);
    }, [showing]);

    const addAnimal = e => {
        e.preventDefault();
        // console.log('pressed');
        setListedAnimals([...listedAnimals, current]);
        // send to server with e.g. `window.fetch`
        setCurrent('');
      }

    const getResult = () => {
        var temp = [];
        for(var i=0; i<animals.length; i++) {
            var found = false;
            for(var j=0; j<listedAnimals.length; j++){
                if(animals[i].toLowerCase() === listedAnimals[j].toLowerCase()) {
                    found = true;
                }
            }
            found ? temp.push(true) : temp.push(false);
        }
        setCheck(temp);
        setSubmitted(true);
        console.log(temp);
      }
    const changeCurrent = e => {
        setCurrent(e.target.value);
      }

    const retryFunction = () => {
        var temp = [];
        while(temp.length < 10) {
            var a = db[getRandomInt(db.length)];
            if (!temp.includes(a)) temp.push(a);
        }
        setAnimals(temp);

        setListedAnimals([]);
        setCheck([]);
        setShowing(-1);
        setSubmitted(false);
      }

    return (
        <div className="demoDiv">
            {
                showing === -1
                ? <div className="startDiv">
                    <h1>Serial postion effect demo</h1>
                    <p>On pressing start, a list of 10 animals will be displayed to you for a few seconds. After the time limit ends, you have to recall as many animals as you can.</p>
                    <button onClick={startFunciton}>Start</button>
                </div>
                : animals.length > 0 && showing >= 0 && showing < 10
                // false
                ? <h1>{animals[showing]}</h1>
                : !submitted ?
                <div className="timeUpDiv">
                    <h1>Time up!</h1>
                    <p>Add all the animals you can remember.</p>
                    {
                        listedAnimals.map((animal, i)=><p className="label" key={i}>{animal}</p>)
                    }
                    <form action="" onSubmit={addAnimal}>
                        <input type="text" placeholder="Enter animal name here" value={current} name="" onChange={changeCurrent}></input>
                        <button type="submit">Add</button>
                    </form>
                    <button onClick={getResult}>Submit</button>
                </div>
                : <div className="resultsDiv">
                    <h1>Results</h1>
                    {
                        animals.map((animal,i)=>{
                            return <p className={`resultLabel ${check[i] ? 'green' : 'red'}`}>{animal}</p>
                        })
                    }
                    <button onClick={retryFunction}>Retry</button>
                </div>
            }
        </div>
    )
}

export default Demo
