"use client"

import React, { useState, useEffect } from 'react';
import { Client, Databases } from 'appwrite';

export default function Demo() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Initialize Appwrite client
    const client = new Client()
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject('ab97a1b87861f3b9435024a065345fd017335b9b1518a307623b6db22b6e6e9f8c90f5bb6259f73985b38a5ed86c109fbff91e3703f80a9e4fcb6c93e294f2ce4a3e2cac104a32f32efb4ab09cb6bcddbeda01744b5c4cb5eac18e451764e35707463135e17e92849589e7e59cfc62046009824dae6c3dd41c2ad91ca411422c');

    // Initialize Databases service
    const databases = new Databases(client);

    // Fetch documents from the database
    databases
      .listDocuments('crwdid', 'crwddbid', 'smsid')
      .then(response => {
        // Set the messages state with the fetched documents
        setMessages(response.documents);
      })
      .catch(error => {
        console.error('Error fetching documents:', error);
      });
  }, []);

  return (
    <div>
      <h2>Messages</h2>
      <table>
        <thead>
          <tr>
            <th>Sender</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message, index) => (
            <tr key={index}>
              <td>{message.sender}</td>
              <td>{message.messageBody}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
