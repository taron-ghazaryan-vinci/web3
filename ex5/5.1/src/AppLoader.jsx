import { ProviderWrapper as CounterProviderWrapper } from "./contexts/countersContext";
import App from "../src/App";

const AppLoader= () => {
  return (
    <CounterProviderWrapper >
        <App />
    </CounterProviderWrapper >
  )
}

export default AppLoader;