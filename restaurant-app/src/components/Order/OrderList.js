import React, { useState, useEffect } from 'react'
import { createAPIEndpoint, ENDPIONTS } from '../../api'
import Table from '../../layouts/Table';
import { TableCell, TableHead, TableRow, TableBody  } from '@material-ui/core';
import DeleteOutlineTwoToneIcon from '@material-ui/icons/DeleteOutlineTwoTone';

export default function OrderList(props) {

    const { setOrderId, setOrderListVisibility, resetFormControls, setNotify } = props;
    const [orderList, setOrderList] = useState([]);
    const [customerList, setCustomerList] = useState([]);

    useEffect(() => {
        // console.log(createAPIEndpoint(ENDPIONTS.CUSTOMER).fetchAll())
        createAPIEndpoint(ENDPIONTS.CUSTOMER).fetchAll()
            .then(res => {
                let customerList = res.data.$values.map(item => ({
                    id: item.customerID,
                    title: item.customerName
                }));
                customerList = [{ id: 0, title: 'Select' }].concat(customerList);
                setCustomerList(customerList);
            })
            .catch(err => console.log(err))
      }, [])

    useEffect (() => {
        createAPIEndpoint(ENDPIONTS.ORDER).fetchAll()
            .then(res => {
                console.log(res.data);
                setOrderList(res.data.$values)
            })
            .catch(err => console.log(err))
    },[])

    const showForUpdate = id => {
        // console.log(id);
        // window.confirm('Are you sure to update this record?')
        setOrderId(id);
        setOrderListVisibility(false);
    }

    const deleteOrder = id => {
        if (window.confirm('Are you sure to delete this record?')) {
            createAPIEndpoint(ENDPIONTS.ORDER).delete(id)
                .then(res => {
                    setOrderListVisibility(false);
                    setOrderId(0);
                    resetFormControls();
                    setNotify({ isOpen: true, message: 'Deleted successfully.' });
                })
                .catch(err => console.log(err))
        }
    }

    const getCustomerName = customerId => {
        const customer = customerList.find(cust => cust.id === customerId);
        return customer ? customer.title : '';
    };

  return (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell>Order No.</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Payed With</TableCell>
                <TableCell>Grand Total</TableCell>
                <TableCell></TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {
                orderList.map(item => (
                    <TableRow key={item.orderMasterId}>
                        <TableCell
                            onClick={e => showForUpdate(item.orderMasterId)}>
                            {item.orderNumber}
                        </TableCell>
                        <TableCell
                            onClick={e => showForUpdate(item.orderMasterId)}>
                            {/* {item.customer.customerName} */}
                            {getCustomerName(item.customerId)}
                        </TableCell>
                        <TableCell
                            onClick={e => showForUpdate(item.orderMasterId)}>
                            {item.pMethod}
                        </TableCell>
                        <TableCell
                            onClick={e => showForUpdate(item.orderMasterId)}>
                            {item.gTotal}
                        </TableCell>
                        <TableCell>
                            <DeleteOutlineTwoToneIcon
                                color="secondary"
                                onClick={e => deleteOrder(item.orderMasterId)} />
                        </TableCell>

                    </TableRow>
                ))
            }
        </TableBody>
    </Table>
  )
}
