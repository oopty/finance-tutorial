import { Header } from "@/components/header";

type Props = {
    childeren: React.ReactNode
}

const DashboardLayout = ({childeren}: Props) => {
    return (
        <>
            <Header />
            <div>
                Layout
            </div>
        </>
    );
}

export default DashboardLayout;