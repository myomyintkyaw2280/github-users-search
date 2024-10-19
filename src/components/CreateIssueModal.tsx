import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_REPO_ID = gql`
  query GetRepoId($owner: String!, $repo: String!) {
    repository(owner: $owner, name: $repo) {
      id
    }
  }
`;

const CREATE_ISSUE = gql`
  mutation CreateIssue($repositoryId: ID!, $title: String!, $body: String) {
    createIssue(input: { repositoryId: $repositoryId, title: $title, body: $body }) {
      issue {
        number
        title
        url
      }
    }
  }
`;

interface CreateIssueModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  owner: string;
  repo: string;
  onIssueCreated: () => void;
}

const CreateIssueModal: React.FC<CreateIssueModalProps> = ({
  isOpen,
  onRequestClose,
  owner,
  repo,
  onIssueCreated,
}) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const { data, loading, error } = useQuery(GET_REPO_ID, {
    variables: { owner, repo },
    skip: !isOpen,
  });

  const [createIssue, { loading: mutationLoading, error: mutationError }] = useMutation(CREATE_ISSUE, {
    onCompleted: () => {
      onIssueCreated();
      clearForm(); // Reset the form fields after issue creation
    },
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data && data.repository.id) {
      createIssue({
        variables: {
          repositoryId: data.repository.id,
          title,
          body,
        },
      });
    }
  };

  // Clear form fields
  const clearForm = () => {
    setTitle('');
    setBody('');
  };

  // Handle modal close and reset form
  const handleClose = () => {
    clearForm(); // Clear form data when the modal is closed
    onRequestClose(); // Trigger the modal close event
  };

  return (
    <Modal  show={isOpen} onHide={handleClose} backdrop="static" contentLabel="Create New Issue">
      <Modal.Header closeButton>
        <Modal.Title>Create New Issue</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {mutationLoading && <div className="alert alert-info">Creating issue...</div>}
        {mutationError && <div className="alert alert-danger">Error: {mutationError.message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="issueTitle">Title:</label>
            <input
              id="issueTitle"
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="issueBody">Body:</label>
            <textarea
              id="issueBody"
              rows={7}
              className="form-control"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-success btn-md">Submit</button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateIssueModal;
