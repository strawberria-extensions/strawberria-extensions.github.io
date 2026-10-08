export interface Device {
    lockId: number;
    name: string;
    passcodeEnabled: boolean;
}
export interface Passcode {
    code: string;
    expiresAt: string;
}
export interface Page {
    userRole: 'wearer' | 'keyholder';
    state: 'unbound' | 'available' | 'locked' | 'deserted' | 'returning' | 'returned';
    device: Device | null;
    username?: string;
    boundAccount?: string;
    passcode: Passcode | null;
}
