import React from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import Stage1 from './stage1';
import Stage2 from './stage2';
import Stage3 from './stage3';


export const RouterComp = () => {
    return (
        <Router>
            <Stack>
                <Scene
                    key="stage1"
                    hideNavBar
                    component={Stage1} />
                <Scene
                    key="stage2"
                    title="Test Zamanı"
                    component={Stage2} />
                <Scene
                    key="stage3"
                    title="Stage 3"
                    component={Stage3} />
            </Stack>
        </Router>
    )
}