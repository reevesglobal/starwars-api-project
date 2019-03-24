import React from 'react';
import CharacCard from './CharacCard';

const CharacCardList = ({ c }) => { 
    return (
        <div>
            { 
                c.map((charac, i) => {
                    return (
                        c[i].results.map((result, j) => {
                            return (
                                <CharacCard 
                                    key= {j} 
                                    name={c[i].results[j].name} 
                                />
                            );
                        })
                    )
                })
            }
        </div>
    );
}

export default CharacCardList;