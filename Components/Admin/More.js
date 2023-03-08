import React, { Fragment, useState } from "react";

const More = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <Fragment>
      {!isOpen && (
        <div className="position-absolute localMorePerson">
          <div className="container bg-white rounded">
            <div className="row p-1 rounded shadow border">
              <div className="col-12 my-2">
                <button className="btn btn-sm btn-secondary w-100">
                  Cập nhập vai trò
                </button>
              </div>
              <div className="col-12 my-2">
                <button className="btn btn-sm btn-secondary w-100">
                  Cập nhập trạng thái
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default More;
