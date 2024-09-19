import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MAIN } from '../utils/constants'
import {useChatContext} from '../utils/Context/ChatProvider'
import {Box, SlideDirection} from '@chakra-ui/react'
import Chatbox from '../components/userAvatar/Chatbox'
import SideDrawer from '../components/miscellaneous/SideDrawer'
import MyChats from '../components/userAvatar/MyChats'
const ChatPage = () => {

  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = useChatContext();

  return (
    <div style={{ width: "100%" }}>
    {user && <SideDrawer />}
    <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
      {user && <MyChats fetchAgain={fetchAgain} />}
      {user && (
        <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      )}
    </Box>
  </div>  )
}

export default ChatPage