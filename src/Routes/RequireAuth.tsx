/* eslint-disable react-hooks/exhaustive-deps */
import {useLocation, useNavigate} from "react-router-dom";
import AuthRequest from "../Services/Requests/auth.request";
import {useCallback, useContext, useEffect} from "react";
import {UserContext, AccountContext} from "../Pages/WalletFriend";
import Account from "../Types/Account/account.types";


export default function RequireAuth({children}: { children: any }) {
    let location = useLocation();
    const navigate = useNavigate();
    const {setUser} = useContext(UserContext);
    const {setAccount} = useContext(AccountContext);

    const isAuthenticated = useCallback(() => {
        const access_token = localStorage.getItem('access_token');
        const username = localStorage.getItem('username');
        if (access_token && username) {
            AuthRequest.validateToken(username)
                .then((response) => {
                    setUser(response.data.user);
                    setAccount(fixAccountDates(response.data.account));
                })
                .catch(() => {
                    // Clean localStorage to be safe
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('username');
                    setUser(undefined);
                    navigate('/auth/login', {replace: true, state: {from: location}});
                });
        } else {
            // Clean localStorage to be safe
            localStorage.removeItem('access_token');
            localStorage.removeItem('username');
            setUser(undefined);
            navigate('/auth/login', {replace: true, state: {from: location}});
        }
    }, []);

    useEffect(() => {
        isAuthenticated();
    }, [isAuthenticated]);

    return children;
}

function fixAccountDates(account: Account) {
    account.creation_datetime = new Date(account.creation_datetime);
    account.bags.forEach((bag) => {
        if (bag.end_date !== undefined) {
            bag.end_date = new Date(bag.end_date);
        }
        bag.history.forEach((history) => {
            history.creation_datetime = new Date(history.creation_datetime);
        });
    });
    account.fixed_expenses.forEach((fixed_expense) => {
       fixed_expense.creation_datetime = new Date(fixed_expense.creation_datetime);
       fixed_expense.bag_movements.forEach((bag_movement) => {
          bag_movement.creation_datetime = new Date(bag_movement.creation_datetime);
       });
    });
    account.fixed_incomes.forEach((fixed_income) => {
        fixed_income.creation_datetime = new Date(fixed_income.creation_datetime);
        fixed_income.bag_movements.forEach((bag_movement) => {
            bag_movement.creation_datetime = new Date(bag_movement.creation_datetime);
        });
     })
    account.single_expenses.forEach((single_expense) => {
        single_expense.creation_datetime = new Date(single_expense.creation_datetime);
        single_expense.bag_movements.forEach((bag_movement) => {
            bag_movement.creation_datetime = new Date(bag_movement.creation_datetime);
        });
    });
    account.single_incomes.forEach((single_income) => {
        single_income.creation_datetime = new Date(single_income.creation_datetime);
        single_income.bag_movements.forEach((bag_movement) => {
            bag_movement.creation_datetime = new Date(bag_movement.creation_datetime);
        });
    });
    console.log(account);
    return account;
}