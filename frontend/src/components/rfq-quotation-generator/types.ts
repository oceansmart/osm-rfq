export interface MappingItem {
  id: string;
  customerColumn: string;
  systemField: string;
  status: 'Mapped' | 'Unmapped'; // Assuming status might vary, currently all 'Mapped'
}

