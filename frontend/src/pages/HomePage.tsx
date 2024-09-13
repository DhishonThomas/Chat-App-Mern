import { Container,Box ,Text, Tabs, TabList, Tab, TabPanels, TabPanel} from '@chakra-ui/react'
import React from 'react'
import Login from '../components/authentication/Login'
import SignUp from '../components/authentication/SignUp'
const HomePage = () => {
  return (
  
    <Container maxW={'xl'} centerContent>
         <Box
         display={"flex"}
         justifyContent={'center'}
         p={3}
         bg={"white"}
         w={"100%"}
         m={"40px 0 15px 0"}
         borderRadius={"lg"}
         borderWidth={"1px"}
         >
<Text fontSize={"4xl"} fontFamily={"work sans"} color={"black"}>
    Talk-A-Tive
</Text>
         </Box>

<Box bg={"white"} w={"100%"} p={4} borderRadius={"lg"} textColor={"black"} borderWidth={"1px"}>
<Tabs variant='soft-rounded' colorScheme='green'>
  <TabList>
    <Tab width={"50%"}>Login</Tab>
    <Tab width={"50%"}>Sign Up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
<Login/>
    </TabPanel>
    <TabPanel>
<SignUp/>
    </TabPanel>
  </TabPanels>
</Tabs>
</Box>

    </Container>
  )
}

export default HomePage