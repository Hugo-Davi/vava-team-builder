import { useState } from "react";

import { agents } from "../services/dataService";


const Home = () => {

    const [team, setTeam] = useState([]);
    const [agent, setAgent] = useState();
    const [error, setError] = useState()

    const submitHandler = (e) => {
        e.preventDefault()
        if (team.find((ag) => agent.toLocaleUpperCase() == ag)) {
            setError('O time já tem ' + agent)
            return
        }
        if (!agents.find((ag) => agent.toLocaleUpperCase() == ag.toLocaleUpperCase())) {
            setError('Não existe um agente: "' + agent + '"')
            return
        }
        if (team.length >= 5) {
            setError('O time só pode ter até 5 agentes')
            return
        }
        setTeam([...team, agent.toLocaleUpperCase()])
        setAgent('')
        setError('')

    }

    const changeHandler = (value) => {
        setAgent(value);
    }

    return (
        <div>
            <div className="m-5 flex align-middle w-100 justify-center">
                <div>
                    <h1 className="text-3xl font-bold mx-2">Team builder</h1>
                </div>
                <form action="submit" onSubmit={submitHandler}
                    className="w-100">
                    <input type="text" onChange={event => changeHandler(event.target.value)} value={agent}
                        placeholder="Nome do agente"
                        className="bg-red-400 rounded-md p-2 w-100 placeholder-gray-950"
                    />
                </form>
            </div>
            <div className="flex justify-center min-h-24">
                {team[0] ? team.map((a) => {
                    return <div className="m-2">
                        <img src={`/agent-img/${a.toLowerCase()}.webp`} alt={a}
                            className="w-52 h-52 object-cover"
                        />
                        <div className="text-center text-2xl font-bold">{a}</div>
                    </div>
                }) : <div className="text-2xl font-bold m-5">Time vazio</div>}
            </div>
            {
                error ? <h2 className="text-center text-2xl text-red-600">{error}</h2> : <div></div>
            }
            <div className="justify-center m-5 flex flex-wrap">
                {agents.map((agent) => {
                    return <div className="justify-center m-4 min-w-28  bg-red-500">
                        <img src={`/agent-img/${agent.toLowerCase()}.webp`} alt={agent}
                            className="object-contain w-100"
                        />
                        <div className="text-3xl text-center font-bold my-2">{agent}</div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Home;