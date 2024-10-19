import React, { useState } from 'react';
import { Pagination, ListGroup } from 'react-bootstrap';

interface Issue {
  node: {
    title: string;
    number: number;
    url: string;
    createdAt: string;
    author: {
      login: string;
    };
  };
}

interface Props {
  issues: Issue[];
}

const IssueList: React.FC<Props> = ({ issues }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const issuesPerPage = 5;

  // Calculate the total number of pages
  const totalPages = Math.ceil(issues.length / issuesPerPage);

  // Get current issues to display
  const indexOfLastIssue = currentPage * issuesPerPage;
  const indexOfFirstIssue = indexOfLastIssue - issuesPerPage;
  const currentIssues = issues.slice(indexOfFirstIssue, indexOfLastIssue);

  const getTimeDifference = (createdAt: string) => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();

    const timeDifference = currentDate.getTime() - createdDate.getTime();

    const daysAgo = Math.floor(timeDifference / (1000 * 3600 * 24));
    const hoursAgo = Math.floor((timeDifference % (1000 * 3600 * 24)) / (1000 * 3600));
    const minutesAgo = Math.floor((timeDifference % (1000 * 3600)) / (1000 * 60));

    if (daysAgo > 0) return `${daysAgo} days ago`;
    else if (hoursAgo > 0) return `${hoursAgo} hours ago`;
    else return `${minutesAgo} minutes ago`;
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="justify-content-between mt-5 mx-auto col-9">
      {/* Issue List */}
      <ListGroup variant="flush" className="my-4">
        {currentIssues.map(({ node }) => (
          <ListGroup.Item key={node.number}>
            <div className="d-flex justify-content-between">
              <span>
                <a href={node.url} target="_blank" rel="noopener noreferrer">
                  {node.title} #{node.number}
                </a>
              </span>
              <small className="text-muted">{`${getTimeDifference(node.createdAt)} by ${node.author.login}`}</small>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Centered Pagination */}
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Pagination>
          <Pagination.Prev 
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1}
          />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </div>
  );
};

export default IssueList;
