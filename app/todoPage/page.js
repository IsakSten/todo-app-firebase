'use client';

import { useState, useEffect } from "react";
import Logout from "../components/Logout";
import styles from '../page.module.css'
import { db } from "@/firebase-config/firebase";
import { collection, getDocs, addDoc } from 'firebase/firestore'


export default function page() {
    
    const [newTodoTitle, setNewTodoTitle] = useState('');
    const [newTodoDesc, setNewTodoDesc] = useState('');

    const [todos, setTodos] = useState([]);
    const todosCollectionRef = collection(db, 'todos');

    const createTodo = async () => {
        try {
            await addDoc(todosCollectionRef, {
                title: newTodoTitle, 
                desc: newTodoDesc
            });
            getTodos()
        } catch (err) {
            console.error(err)
        }
    };


    const getTodos = async () => {

        try {
            const data = await getDocs(todosCollectionRef)
            setTodos(data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            })))

            
        } catch (err) {
            console.error(err)
        }
    };
    

    useEffect(() => {
        getTodos()
    }, [])



    return (
        <div className={styles.main}>
            <h1>Todo page</h1>
            <Logout />

            <div className={styles.todoBox}>
                <div className={styles.todos}>
                    <input placeholder="Title..." 
                    onChange={(event) => {
                        setNewTodoTitle(event.target.value)}}/>

                    <input placeholder="Description..."
                    onChange={(event) => {
                        setNewTodoDesc(event.target.value)}}/>

                    <button onClick={createTodo}>Create todo</button>
                </div>

            </div>
            {todos.map((todo) => {
                return (
                    <div key={todo.id}>
                        <h1>{todo.title}</h1>
                        <p>{todo.desc}</p>
                    </div>
                );
            })}
        </div>

    )
}
