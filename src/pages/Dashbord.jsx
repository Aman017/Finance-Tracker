import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import Cards from '../components/Cards/Cards'
import AddExpense from '../components/Modals/AddExpense';
import AddIncome from '../components/Modals/AddIncome';
import { toast } from 'react-toastify';
import { addDoc, collection, deleteDoc, deleteField, doc, getDocs, query, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import TransationsTable from '../components/TransationTable/TransationsTable';
import Charts from '../components/Charts/Charts';
import NoTansactions from '../components/NoTansactions';

  

const Dashbord = () => {



const [transactions, setTransactions] = useState([]);
const [loading, setLoading] = useState(false);
  const [user]= useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  
  const [income , setIncome] = useState(0);
  const [expense , setExpense] = useState(0);
  const [totalbalance , setTotalBalance] = useState(0);



  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };
  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };
  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const onFinish = (values, type) => {
const newTransaction = {
  type: type,
  date: values.date.format('DD-MM-YYYY'),
  amount: parseFloat(values.amount),
  tag:  values.tag,
  name: values.name,
  };
addTransaction(newTransaction);

  }
async function addTransaction(transaction,many) {
  //add the doc
  try{
const docRef = await addDoc(
  collection(db,`users/${user.uid}/transactions`),transaction
);
// console.log("Document written with ID: ", docRef.id);

  if(!many)toast.success("Transaction added successfully!");
  setTransactions(prev => [...prev, transaction]);

  }catch (e) {
    console.error("Error adding transaction:", e);
  
      if(!many)toast.error("Error adding transaction. Please try again.");
 
  } 
}

useEffect(() => {
  // console.log("User state changed:", user);
  if (user) {
    fetchTransactions();
  }
}, [user]);

useEffect(() => {   calculateBalance();
}, [transactions]);

const calculateBalance = () => {
  let incomeTotal = 0;
  let expenseTotal = 0;

  transactions.forEach((transaction)=>{
if(transaction.type === 'income') {
  incomeTotal += transaction.amount;
} else{
  expenseTotal += transaction.amount;
}
  })
  setIncome(incomeTotal);
  setExpense(expenseTotal); 
  setTotalBalance(incomeTotal - expenseTotal);
}

async function fetchTransactions() {
    setLoading(true);
    if(user){
      const q =query(
        collection(db, `users/${user.uid}/transactions`),
      );
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      // console.log("Transactions fetched:", transactionsArray);
      toast.success("Transactions fetched successfully!");
    }
    setLoading(false);
}

let sortedTransactions = transactions.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
});

async function restBlance() {
  if (!user) return;

  // const confirmReset = window.confirm(
  //   "Are you sure you want to reset your balance? This will delete all transactions and cannot be undone!"
  // );

  // if (!confirmReset) return; // user clicked "No"

  const userRef = doc(db, 'users', user.uid);
  // console.log("Resetting balance for user:", user.uid);

  try {
    // Delete all transactions
    const transactionsCol = collection(db, `users/${user.uid}/transactions`);
    const querySnapshot = await getDocs(transactionsCol);

    const deletePromises = querySnapshot.docs.map(docItem => deleteDoc(docItem.ref));
    await Promise.all(deletePromises);

    // Delete fields in user doc
    await updateDoc(userRef, {
      income: deleteField(),
      expense: deleteField(),
      totalBalance: deleteField(),
    });

    // Reset local state
    setTransactions([]);
    setIncome(0);
    setExpense(0);
    setTotalBalance(0);

    toast.success("Balance reset successfully!");
  } catch (error) {
    console.error("Error resetting balance:", error);
    toast.error("Failed to reset balance. Please try again.");
  }
}

  return (
    <div>
      <Header  />
      {loading?(
        <p>Loading...</p>
      ):(
        <>
    
      <Cards
      income={income}
      expense={expense}
        totalbalance={totalbalance}
      showExpenseModal={showExpenseModal}
        showIncomeModal={showIncomeModal}
        restBlance={restBlance}
     
      />
    {transactions && transactions.length !=0?<Charts sortedTransactions={sortedTransactions}/> :<NoTansactions />} 
     <AddExpense
            onFinish={onFinish}
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
          />
          <AddIncome
            onFinish={onFinish}
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
          />

          <TransationsTable transactions={transactions} addTransaction={addTransaction}/>
      </>
    )}
    </div>
  )
}

export default Dashbord
