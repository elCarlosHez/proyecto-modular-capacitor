import { createContext, useCallback, useContext, useState } from "react";

interface IInvestmentContext {
    investment: any;
    name: string;
    money: number;
    saving: number;
    earnings: any;
    setName: (name: string) => void;
    setInvestment: (investment: any) => void;
    setMoney: (money: number) => void;
    setSaving: (saving: number) => void;
    setEarnings: (earnings: any) => void;
    clear: () => void;
}

const InvestmentContext = createContext<IInvestmentContext | undefined>(undefined);

interface IInvestmentProvider {
    children: JSX.Element | JSX.Element[];
}

export const InvestmentProvider = (props: IInvestmentProvider): JSX.Element => {
    const { children } = props;
    const [name, setName] = useState('');
    const [investment, setInvestment] = useState();
    const [earnings, setEarnings] = useState();
    const [money, setMoney] = useState(0);
    const [saving, setSaving] = useState(0);

    const clear = useCallback(() => {
        setName('');
        setInvestment(undefined);
        setEarnings(undefined);
        setMoney(0);
        setSaving(0);
    }, []);

    return (
        <InvestmentContext.Provider
            value={{
                investment,
                setInvestment,
                name,
                setName,
                money,
                setMoney,
                saving,
                setSaving,
                earnings,
                setEarnings,
                clear,
            }}>
            {children}
        </InvestmentContext.Provider>
    );
};


export const useInvestmentContext = () => {
    const context = useContext(InvestmentContext);
    if (context === undefined) {
        throw new Error('useInvestmentContext must be used within a InvestmentProvider');
    }

    return context;
};
