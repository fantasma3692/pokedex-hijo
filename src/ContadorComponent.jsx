import { useContadorStore } from "./store/ContadorStore";

export function ContadorComponent() {
    const {count}= useContadorStore()
  return (<div>Hola mundo con zustand {count}</div>);
}
