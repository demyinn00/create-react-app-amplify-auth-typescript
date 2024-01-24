import React, { useEffect, useState } from "react";
import { Amplify } from "aws-amplify";
import {
  AmplifyProvider,
  Authenticator,
  Button,
  Flex,
  Image,
  Text,
  View,
} from "@aws-amplify/ui-react";
import aws_exports from "./aws-exports";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import "@aws-amplify/ui-react/styles.css";
import theme from "./theme";
import logo from "./logo.svg";
import useTasks from "./hooks/useTask"

Amplify.configure(aws_exports);

const App = () => {
  const { tasks, addTask } = useTasks();
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => setIsFormVisible(!isFormVisible);

  return (
    <AmplifyProvider theme={theme}>
      <Authenticator>
        {({ signOut, user }) => (
          <Flex
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            alignContent="flex-start"
            wrap="nowrap"
            gap="1rem"
            textAlign="center"
          >
            {/* <View width="100%">
              <Image src={logo} alt="logo" width={240} height={240} />
            </View> */}

            {user && (
              <>
                <View width="100%">
                  <Text>HELLO! {user.username}</Text>
                  <Button onClick={signOut}>
                    <Text>Sign Out</Text>
                  </Button>
                  <Button onClick={toggleFormVisibility}>
                    + New Task
                  </Button>
                  <TaskForm 
                    onTaskCreated={addTask}
                    onClose={toggleFormVisibility}
                    isVisible={isFormVisible}
                  />
                  <TaskList tasks={tasks} />
                </View>
              </>
            )}

            <View width="100%">
              <Text>
                Edit <code>src/App.tsx</code> and save to reload.
              </Text>
            </View>
          </Flex>
        )}
      </Authenticator>
    </AmplifyProvider>
  );
};

export default App;
