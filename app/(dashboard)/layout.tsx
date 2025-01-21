import { Header } from "@/components/header";

type Props = {
    childeren: React.ReactNode
}

const DashboardLayout = ({childeren}: Props) => {
    return (
        <>
            <Header />
            <div>
                {childeren}
            </div>
        </>
    );
}

export default DashboardLayout;