import { Stack } from 'expo-router';

const Layout = () =>{
    return <Stack
    screenOptions={{
        headerStyle: {
          padding: 0,
          height: 0
        },
        headerTintColor: '#fff',
      
      }}/>
}

export default Layout;