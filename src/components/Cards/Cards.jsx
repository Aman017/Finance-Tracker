import React from 'react'
import './styles.css'
import { Card, Popconfirm, Row } from 'antd'
import Button from '../Button/Button'

const Cards = ({  income,
      expense,
        totalbalance, showExpenseModal, showIncomeModal,restBlance}) => {
  return (
    <div>
      <Row className='my-row' >
        <Card bordered={true} className='my-card'>
  <h2>Current Balance</h2>
  <p>₹{totalbalance}</p>
<Popconfirm
  title="Reset Balance"
  description="Are you sure to Rest Blance it can't be undo?"
  okText="Yes"
  cancelText="No"
  onConfirm={restBlance}
  // you can also add placement="top" if needed
>
  <span> {/* wrap your custom Button in a span */}
    <Button text="Reset Balance" blue={true} />
  </span>
</Popconfirm>
</Card>
        <Card bordered={true} className='my-card'>
          <h2>Total Income</h2>
          <p>₹{income}</p>
         <Button text="Add Income" blue={true} onClick={showIncomeModal} />
        </Card>
        <Card bordered={true} className='my-card'>
          <h2>Total Expenses</h2>
          <p>₹{expense}</p>
         <Button text="Add Expense" blue={true} onClick={showExpenseModal} />
        </Card>
        
      </Row>
    </div>
  )
}

export default Cards
