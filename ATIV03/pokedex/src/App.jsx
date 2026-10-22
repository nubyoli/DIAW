import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import CircularGallery from './components/CircularGallery'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div style={{ height: '600px', position: 'relative' }}>
  <CircularGallery
    bend={3}
    textColor="#ffffff"
    borderRadius={0.05}
    scrollEase={0.05}
    onItemClick={(item, index) => console.log(item.text, index)}
    itemSize={1}
    itemAspect={0.78}
    gap={0.26}
    wave={1}
    fadeEdges={0.12}
    shadow={0.25}
    scrollSpeed={2}
    autoScroll={0}
    snap
    grayscale={false}
    showTitles
    openOnClick
    intro
/>
</div>
    </>
  )
}

export default App
