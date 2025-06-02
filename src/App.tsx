import { useState, useEffect } from 'react'
import {Card, CardContent, Container, Box, Avatar} from "@mui/material"
import '../css/style.css'
import '../img/profile-thumbnail.png'

interface AppProps {
  description: string
}
function App({description}: AppProps) {

  const [profileDescription, setProfileDescription] = useState<string>(description);

  useEffect(() => {
    if (!isTextWithinBox()) {
      let innerText = description.slice(0, 22) + '...'
      console.log(innerText)
      setProfileDescription(innerText)
    }
  }, [])
  
  const isTextWithinBox = (): boolean => {
    let boundingRect = document.getElementById("textBox");
    console.log(boundingRect)
    if (boundingRect && boundingRect.innerText.length > 25) {
      return false
    }
    return true;
  }

  /**
   * Tailwind guide/ CSS guide:
   * COntainer: 
   * - bg-red-50: background color red with opacity of 50
   * - h-screen: COntainer by default fills width of screen. h-screen makes it take up all available height space too
   * 
   * div:
   * - just a way to align things at a fixed height kind of off center
   * - pretty much just a flex row at a fixed height where the profile box is aligned right in the centerof the row
   * 
   * Justify-center: align items on the center of the container's main axis (horizontal)
   * Items-center: align items on center of container's secondayr axis (vertical)
   * 
   * CompleteProfileBox:
   * - blue box containing the header box and description box
   * - make it a flex col so that the header box and profile box are on top of eachother rather than side to side
   * - needs to be flex so that the description box can use the flex-1 property and take up the remaining space in this box
   * 
   * 
   * HeaderBox:
   * - instead of heavily modifying the margins, I just made the items to be aligned along the vertical axis on center
   * - this way we don't need to worry about top and bottom margins since that is set automatically
   * 
   * id descriptionBox:
   * - instead of using margins, we can position the box containing the text in such a way that it looks padded/margined
   * - but hopefully it is more responsive
   * - but we need this descriptionBox to take up the rest of the lower height of the blue box without impeding the avatar/username box
   * - we can accomplish this by making the box holding the username/avatar content and the desctiption content a flex
   * - then make this descriptionBox flex-1 to fill up remaining space of that parent box
   * - finally, centering the interior box along the vertical and horizontal axis gives it the illusion of padding
   * - but it is much more scalable to all screen sizes
   */
  return (
    <Container className='bg-red-50 h-screen'>
      <div className="h-150 flex flex-row justify-center items-center">
        <Box id='completeProfileBox' className="flex flex-col h-50 w-50 bg-blue-100 rounded-md">
          <Box id='headerBox' className="flex flex-row h-15 w-full bg-green-100 items-center gap-2">
            <Avatar className='ml-2' src='../img/profile-thumbnail.png' alt="profile"></Avatar>
            <Box id='usernameBox' className="flex flex-col flex-grow">
              <p className='font-semibold'>Username</p>
              <p className='text-gray-400'>@username123</p>
            </Box>
          </Box>
          <Box id='descriptionBox' className="border-1 border-black-500 flex flex-1 justify-center items-center">
            <Box id='textBox' className="bg-orange-100 h-8/10 w-9/10">
              <p className='wrap-break-word'>{profileDescription}</p>
            </Box>
          </Box>

        </Box>

      </div>
    </Container>
  )
}

export default App
