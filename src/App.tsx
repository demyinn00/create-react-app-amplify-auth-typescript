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
import { API, graphqlOperation } from "aws-amplify";
import { listTasks } from "./graphql/queries";
import { Task, ListTasksQuery } from './API';
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

import { GraphQLResult } from '@aws-amplify/api-graphql';

import "@aws-amplify/ui-react/styles.css";
import theme from "./theme";
import logo from "./logo.svg";

Amplify.configure(aws_exports);

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const taskData = await API.graphql(graphqlOperation(listTasks)) as GraphQLResult<ListTasksQuery>;
      console.log(taskData)
      if (taskData.data && taskData.data.listTasks && taskData.data.listTasks.items) {
        const tasks = taskData.data.listTasks.items as Task[];
        setTasks(tasks);
      }
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

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
                  <TaskList tasks={tasks} />
                  <TaskForm onTaskCreated={fetchTasks} />
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
