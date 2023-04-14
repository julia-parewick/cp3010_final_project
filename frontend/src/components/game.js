import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../game.css';

export function TriviaGame() {
    const { isAuthenticated } = useAuth0();
    console.log(isAuthenticated);
    const currentTime = new Date().getTime();
    const date = new Date(currentTime);

    const last_played = new Date(localStorage.getItem("last_played"));

    if(last_played < Date(date.getFullYear,date.getMonth,date.getDate) || localStorage.getItem("last_played")==null){
        return(isAuthenticated &&
            (<div class = "container">
                <div id ="game" class="justify-center flex-column hidden">
    
                    <div id="hud-item">
                        <p class="hud-prefix">
                            Score
                        </p>
                        <h1 class="hud-main-text" id = "score">
                            0
                        </h1>
                    </div>
                    <h2 id = "question">What are the answers?</h2>
                    <div class = "choice-container">
                        <p class = "choice-prefix">A</p>
                        <p class = "choice-text" data-number= "1"></p>
                    </div>
                    <div class = "choice-container">
                        <p class = "choice-prefix">B</p>
                        <p class = "choice-text" data-number= "2"></p>
                    </div>
                    <div class = "choice-container">
                        <p class = "choice-prefix">C</p>
                        <p class = "choice-text" data-number= "3"></p>
                    </div>
                    <div class = "choice-container">
                        <p class = "choice-prefix">D</p>
                        <p class = "choice-text" data-number= "4"></p>
                    </div>
                </div>
            </div>)
        )
    }
}
