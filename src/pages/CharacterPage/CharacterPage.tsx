import { Suspense, lazy } from "react";
import { useParams, Navigate } from "react-router";
import './CharacterPage.css';
import { PATHS } from "#utils/constants.ts";

const CharacterData = lazy(() => import('./CharacterData.tsx').then(module => ({default: module.CharacterData})));

export function CharacterPage() {
    const id = parseInt(useParams()?.id);
    return(
        ((isNaN(id)) ? (
            <Navigate to={PATHS.HOME}/>
        ) : (
            <div className="container">
                <Suspense fallback={<div className='c-page-warning-badge'><h1>LOADING...</h1></div>}>
                    <CharacterData />
                </Suspense>
            </div>
        )
        )
    )
}